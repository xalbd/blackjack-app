import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import React from "react";
import { z } from "zod";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const roomSchema = z.object({
  code: z.string(),
  seats: z.number(),
  takenSeats: z.number(),
});

const roomsSchema = z.object({
  rooms: z.array(roomSchema),
});

type RoomsType = z.infer<typeof roomsSchema>;

export function RoomList() {
  const [rooms, setRooms] = React.useState<RoomsType>({ rooms: [] });
  const [createSeats, setCreateSeats] = React.useState("6");

  const [, setLocation] = useLocation();

  React.useEffect(() => {
    function getInfo() {
      try {
        fetch(`${import.meta.env.VITE_BACKEND}/info`)
          .then((res) => res.json())
          .then((data) => {
            try {
              const rooms = roomsSchema.parse(data);
              // just sort the rooms for now alphabetically
              rooms.rooms.sort();
              setRooms(rooms);
            } catch (err) {
              if (err instanceof z.ZodError) {
                console.log(err.issues);
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    getInfo();
    const interval = setInterval(getInfo, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-row justify-around h-full">
        <Card className="w-1/2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Seats Taken</TableHead>
                <TableHead>Ruleset</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.rooms.map((room, i) => (
                <TableRow
                  key={i}
                  onClick={() => setLocation(`/room/${room.code}`)}
                  className="hover:cursor-pointer"
                >
                  <TableCell>{room.code}</TableCell>
                  <TableCell>Anonymous</TableCell>
                  <TableCell>{`${room.takenSeats}/${room.seats}`}</TableCell>
                  <TableCell>Standard</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="flex flex-col w-1/5 self-center gap-2">
          <div className="flex flex-row items-center gap-2">
            Seats
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex flex-1"
              value={createSeats}
              onValueChange={(value) => {
                if (value) {
                  setCreateSeats(value);
                  console.log(value);
                }
              }}
            >
              {Array.from({ length: 7 }, (_, i) => (
                <ToggleGroupItem
                  className="flex-1"
                  value={(i + 2).toString()}
                  key={i}
                >
                  {i + 2}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <Button
            onClick={() => {
              try {
                fetch(`${import.meta.env.VITE_BACKEND}/create`, {
                  method: "POST",
                  body: JSON.stringify({ Seats: parseInt(createSeats) }),
                })
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error("Room creation failed");
                    }
                    return res.text();
                  })
                  .then((data) => {
                    setLocation(`/room/${data}`);
                  });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Create Room
          </Button>
        </div>
      </div>
    </>
  );
}
