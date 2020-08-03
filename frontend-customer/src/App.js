import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import PromotionDetails from "./PromotionDetails";
import CouponValidation from "./CouponValidation";
import SubtaskValidation from "./SubtaskValidation";
import CouponList from "./CouponList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/promotions/:id" component={PromotionDetails} />
        <Route exact path="/" component={Home} />
        <Route exact path="/coupon-validation" component={CouponValidation} />
        <Route exact path="/subtask-validation" component={SubtaskValidation} />
        <Route exact path="/coupon-list" component={CouponList} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

function NoMatch() {
  return <div>You have come to a place of nowhere! :(</div>;
}

export default App;
