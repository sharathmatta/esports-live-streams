import react, { Component } from "react";
import { connect } from "react-redux";
import { db, storage } from "../../firebase";

class AddGameOrStream extends Component {
  state = {
    streamers: null,
    gamename: null,
    gameLogo: null,
    streamer: null,
    pastBroad: null,
    mainVideo: null,
    clips: null,
    Uploading: false,
    uploaded: false,
    adding: false,
    added: false,
  };
  componentDidMount() {
    const docIds = [];
    db.collection("streamers")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          docIds.push(doc.id);
        });
        this.setState({ streamers: docIds });
      });
  }
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
                .doc(Name.toLowerCase().replace(/\s/g, ""))
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
        db.collection("streamers")
          .doc(this.props.username)
          .collection("recommende")
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
  pastBroadHandler = (event) => {
    this.setState({
      pastBroad: event.target.value,
      uploaded: false,
      Uploading: false,
    });
  };
  mainVideoHandler = (event) => {
    this.setState({
      mainVideo: event.target.value,
      uploaded: false,
      Uploading: false,
    });
  };
  clipsHandler = (event) => {
    this.setState({
      clips: event.target.value,
      uploaded: false,
      Uploading: false,
    });
  };
  addPast = () => {
    this.setState({ uploaded: false });
    this.state.streamers.forEach((el) => {
      this.setState({ uploaded: false });
      db.collection("streamers")
        .doc(el)
        .collection("past-broadcasts")
        .add({
          link: this.state.pastBroad,
        })
        .then((snapshot) => {
          this.setState({ uploaded: true });
        })
        .catch((error) => {});
    });
  };
  addMain = () => {
    this.state.streamers.forEach((el) => {
      db.collection("streamers")
        .doc(el)
        .update({
          mainvideo: this.state.mainVideo,
        })
        .then((snapshot) => {
          this.setState({ uploaded: true });
        });
    });
  };
  addClips = () => {
    this.state.streamers.forEach((el) => {
      this.setState({ uploaded: false });
      db.collection("streamers")
        .doc(el)
        .collection("clips")
        .add({
          link: this.state.clips,
        })
        .then((snapshot) => {
          this.setState({ uploaded: true });
        })
        .catch((error) => {});
    });
  };
  addStreamertoGame = () => {
    console.log(this.state.gamename, this.state.streamer);
    this.setState({ Uploading: true, uploaded: false });
    const gamename = this.state.gamename;
    const streamer = this.state.streamer;
    db.collection();
  };
  gameListHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      gamename: event.target.value,
      uploaded: false,
      Uploading: false,
    });
  };
  addgamelist = () => {
    this.state.streamers.forEach((el) => {
      this.setState({ uploaded: false });
      db.collection("streamers")
        .doc(el)
        .collection("game-list")
        .add({
          id: this.state.gamename.toLowerCase().replace(/\s/g, ""),
          name: this.state.gamename,
        })
        .then((snapshot) => {
          this.setState({ uploaded: true });
        })
        .catch((error) => {});
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

    if (this.state.uploaded) {
    }
    return (
      <div>
        {this.props.username}
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
          <button onClick={this.addStreamertoGame}>Add streamer to Game</button>
          <h2>add past-broadcasts</h2>
          <input type="text" onChange={this.pastBroadHandler} />
          {message}
          <button onClick={this.addPast}>Add past</button>
          <h2>add mainvideo</h2>
          <input type="text" onChange={this.mainVideoHandler} />
          {message}
          <button onClick={this.addMain}>Add main</button>
          <h2>add clips</h2>
          <input type="text" onChange={this.clipsHandler} />
          {message}
          <button onClick={this.addClips}>Add clips</button>
          <h2>gamename</h2>
          <input type="text" onChange={this.gameListHandler} />
          {message}
          <button onClick={this.addgamelist}>Add gamelist</button>
        </div>
      </div>
    );
  }
}
const matchStateToProps = (state) => {
  return {
    username: state.auth.username,
  };
};
export default connect(matchStateToProps)(AddGameOrStream);
