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

const roomsSchema = z.object({
  rooms: z.array(z.string()),
});

type RoomsType = z.infer<typeof roomsSchema>;

export function RoomList() {
  const [rooms, setRooms] = React.useState<RoomsType>({ rooms: [] });
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    function getInfo() {
      try {
        fetch(`${import.meta.env.VITE_BACKEND}/info`)
          .then((res) => res.json())
          .then((data) => setRooms(data));
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
      <Card className="w-1/3 h-full mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Ruleset</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.rooms.map((room, i) => (
              <TableRow
                key={i}
                onClick={() => setLocation(`/${room}`)}
                className="hover:cursor-pointer"
              >
                <TableCell>{room}</TableCell>
                <TableCell>anon</TableCell>
                <TableCell>?</TableCell>
                <TableCell>blah</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
