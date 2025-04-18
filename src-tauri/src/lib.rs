use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![  
        Migration {  
            version: 1,  
            description: "create task_boards table",  
            sql: "CREATE TABLE IF NOT EXISTS task_boards (  
                id INTEGER PRIMARY KEY AUTOINCREMENT,  
                name TEXT NOT NULL UNIQUE,  
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )",  
            kind: MigrationKind::Up,  
        },
        Migration {  
            version: 2,  
            description: "create task_board_sections table",  
            sql: "CREATE TABLE IF NOT EXISTS task_board_sections (  
                id INTEGER PRIMARY KEY AUTOINCREMENT,  
                task_board_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                name TEXT NOT NULL,  
                FOREIGN KEY (task_board_id) REFERENCES task_boards(id)
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create task_board_section_tasks table",
            sql: "CREATE TABLE IF NOT EXISTS task_board_section_tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_board_section_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                completed_at DATETIME,
                archived_at DATETIME,
                name TEXT NOT NULL,
                description TEXT,
                FOREIGN KEY (task_board_section_id) REFERENCES task_board_sections(id)
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create task_board_section_task_items table",
            sql: "CREATE TABLE IF NOT EXISTS task_board_section_task_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_board_section_task_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                completed_at DATETIME,
                name TEXT NOT NULL,
                FOREIGN KEY (task_board_section_task_id) REFERENCES task_board_section_tasks(id)
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create task_board_tags table",
            sql: "CREATE TABLE IF NOT EXISTS task_board_tags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_board_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                name TEXT NOT NULL,
                color TEXT NOT NULL,
                FOREIGN KEY (task_board_id) REFERENCES task_boards(id)
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "create task_board_section_task_tags table",
            sql: "CREATE TABLE IF NOT EXISTS task_board_section_task_tags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_board_section_task_id INTEGER NOT NULL,
                task_board_tag_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (task_board_section_task_id) REFERENCES task_board_section_tasks(id),
                FOREIGN KEY (task_board_tag_id) REFERENCES task_board_tags(id)
            )",
            kind: MigrationKind::Up,
        }
    ]; 

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:tasks.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
