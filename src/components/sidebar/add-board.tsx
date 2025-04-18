import { useState } from "react";
import { Plus } from "lucide-react";
import type { TaskBoard } from "@/lib/types/tasks";
import { useLazyQuery, useMutation, useData } from "@/hooks";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../input";

export default function AddBoard() {
  const { refetch } = useData();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    refetch();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2" size="lg">
          <Plus size={16} />
          Add Board
        </Button>
      </DialogTrigger>
      <AddBoardForm onSuccess={handleSuccess} />
    </Dialog>
  );
}

function AddBoardForm({ onSuccess }: { onSuccess: () => void }) {
  const { query } = useLazyQuery();
  const { mutate, loading } = useMutation();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const shouldDisable = name.length === 0 || loading;

  const validateBoardName = async () => {
    const { data, error } = await query<TaskBoard>(
      "SELECT * FROM task_boards WHERE name = ?",
      [name],
    );
    if (error) {
      console.error(error);
      return false;
    }
    if (data && data.length > 0) {
      setError("Board already exists");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isValid = await validateBoardName();
    if (!isValid) return;

    const { data, error } = await mutate(
      "INSERT INTO task_boards (name) VALUES (?)",
      [name],
    );
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      console.log("success");
      onSuccess();
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Board</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col items-start gap-4">
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter board name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error !== null}
            errorMessage={error || ""}
          />
          <Button
            onClick={handleSubmit}
            disabled={shouldDisable}
            className="mt-2"
          >
            Create Board
          </Button>
        </div>
      </DialogDescription>
    </DialogContent>
  );
}
