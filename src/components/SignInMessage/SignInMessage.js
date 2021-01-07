import Button from "../../ui/Button/Button";
import classes from "./SignInMessage.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const signinMessage = (props) => {
  return (
    <div className={classes.SigninMessage}>
      <div className={classes.Content}>
        <div className={classes.Message}>
          Sign in to watch your favourite creators
        </div>
        <Button clicked={props.onSignInClick}>Sign In</Button>
      </div>
    </div>
  );
};
const matchDispatchToProps = (dispatch) => {
  return {
    onSignInClick: () => dispatch(actions.showSignIn()),
  };
};
export default connect(null, matchDispatchToProps)(signinMessage);
