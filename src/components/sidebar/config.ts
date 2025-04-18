import type { TaskBoard } from "@/lib/types/tasks";

const config = [
  {
    title: "",
    url: "",
    items: [
      {
        title: "🏠 Dashboard",
        url: "/",
      },
    ],
  },
];

export default function getSidebarConfig(boards: TaskBoard[]) {
  const newConfig = [
    ...config,
    {
      title: "Boards",
      url: "#",
      items: boards.map((board) => ({
        title: board.name,
        url: `/boards/${board.id}`,
      })),
    },
  ];

  return newConfig;
}
