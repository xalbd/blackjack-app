import { Route, Switch } from "wouter";
import { RoomList } from "@/components/TableList";
import Game from "@/components/Game";

export function Router() {
  return (
    <Switch>
      <Route path="/">
        <RoomList />
      </Route>
      <Route path="/room/:room">
        {(params) => <Game room={params.room} />}
      </Route>
    </Switch>
  );
}
