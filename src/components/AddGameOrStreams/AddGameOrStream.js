import react, { Component } from "react";
import { db, storage } from "../../firebase";

class AddGameOrStream extends Component {
  state = {
    gamename: null,
    gameLogo: null,
    streamer: null,
    Uploading: false,
    uploaded: false,
    adding: false,
    added: false,
  };
  gameNameChangeHandler = (event) => {
    this.setState({
      gamename: event.target.value,
      uploaded: false,
      Uploading: false,
    });
  };
  gameLogoHandler = (event) => {
    if (event.target.files[0]) {
      this.setState({
        gameLogo: event.target.files[0],
        uploaded: false,
        Uploading: false,
      });
    }
  };
  addGame = () => {
    const Name = this.state.gamename;
    const gamelogo = this.state.gameLogo;
    if (Name && gamelogo) {
      this.setState({ Uploading: true });
      const uploadtask = storage.ref(`Game Logos/${Name}`).put(gamelogo);
      uploadtask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("Game Logos")
            .child(Name)
            .getDownloadURL()
            .then((url) => {
              db.collection("game")
                .doc(Name)
                .set({
                  id: Name,
                  logo: url,
                })
                .then((snapshot) => {
                  console.log("uploaded");
                  this.setState({ uploaded: true, Uploading: false });
                });
            });
        }
      );
    }
  };
  streamerNameChangeHandler = (event) => {
    this.setState({
      streamer: event.target.value,
      adding: false,
      added: false,
    });
  };
  addStreamer = () => {
    const streamer = this.state.streamer;
    this.setState({ adding: true });
    db.collection("streamers")
      .doc(streamer)
      .get()
      .then((snapshot) => {
        db.collection("popular-streamers")
          .doc(streamer)
          .set({
            id: snapshot.data().id,
            profilePicURL: snapshot.data().profilePicURL,
            username: snapshot.data().username,
            email: snapshot.data().email,
          })
          .then((snapshot) => {
            this.setState({ added: true, adding: false });
          });
      });
  };
  render() {
    let message = null;
    if (this.state.Uploading) {
      message = <p>Uploading. . .</p>;
    } else if (this.state.uploaded) {
      message = <p>uploaded</p>;
    }
    let streamermessage = null;
    if (this.state.adding) {
      streamermessage = <p>Adding. . .</p>;
    } else if (this.state.added) {
      streamermessage = <p>Added</p>;
    }
    return (
      <div>
        <div>
          <h2>add new game</h2>
          <input type="text" onChange={this.gameNameChangeHandler} />
          <input type="file" onChange={this.gameLogoHandler} />
          {message}
          <button onClick={this.addGame}>Add Game</button>
        </div>
        <div>
          <h2>add popular streamer</h2>
          <input type="text" onChange={this.streamerNameChangeHandler} />
          {streamermessage}
          <button onClick={this.addStreamer}>Add streamer</button>
        </div>
      </div>
    );
  }
}

export default AddGameOrStream;
