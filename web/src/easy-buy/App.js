import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "../nav/Navbar";
import Home from "../timeline/Home";
import User from "../user/User";
import Settings from "../settings/Settings";
import Cart from "../cart/Cart";
import Music from "../music/Music";
import Movies from "../movies/Movies";
import Messages from "../messages/Messages";
import Notifications from "../notifications/Notifications";
import Conversation from "../chat/Conversation";
import JoinChat from "../chat/JoinChat";
import Conference from "../conference/Conference";

export default function App() {
  return (
    <Suspense fallback="loading">
      <Router>
        <Switch>
          <Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/settings" component={Settings} />
            <Route path="/cart" component={Cart} />
            <Route path="/music" component={Music} />
            <Route path="/movies" component={Movies} />
            <Route path="/messages" component={Messages} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/chat" component={JoinChat} />
            <Route path="/conversation" component={Conversation} />
            <Route path="/conference" component={Conference} />
          </Navbar>
        </Switch>
      </Router>
    </Suspense>
  );
}
