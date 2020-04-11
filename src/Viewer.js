import React, { Component } from 'react';
import Show from './Show';
import './Viewer.css';
import { Swipeable } from 'react-swipeable';

const enterFullScreen = video => {
  if (video) {
    (
      video.requestFullscreen ||
      video.webkitRequestFullScreen ||
      video.mozRequestFullScreen ||
      video.msRequestFullScreen ||
      video.webkitEnterFullScreen ||
      (() => null)
    ).bind(video)();
  }
};

export default class Viewer extends Component {
  state = { pos: 0, muted: true };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeys);
  }

  handleKeys = e => {
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      return;
    }
    const video = document.querySelector('.item-container > video');

    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        return this.prev();
      case 'ArrowRight':
      case 'KeyD':
        return this.next();
      case 'KeyF':
        video && enterFullScreen(video);
        return;
      case 'Space':
        if (video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
        return;
      default:
        return;
    }
  };

  next = () => {
    const { pos } = this.state;
    const { posts } = this.props;
    if (pos < posts.length) {
      this.setState(
        ({ pos }, { posts }) => ({
          pos: pos < posts.length ? pos + 1 : pos,
        }),
        () => {
          if (this.state.pos === this.props.posts.length - 1) {
            this.props.onLastReach();
          }
        },
      );
    }
  };

  prev = () => {
    this.setState(({ pos }) => ({
      pos: Math.max(pos - 1, 0),
    }));
  };

  render() {
    const { pos } = this.state;
    const { posts } = this.props;
    return (
      <Swipeable
        className="viewer-container"
        onSwipedLeft={() => {
          this.next();
        }}
        onSwipedRight={() => {
          this.prev();
        }}
      >
        <div className="button-container">
          <button disabled={pos === 0} onClick={this.prev}>
            Previous
          </button>
          <input
            id="mute"
            type="checkbox"
            checked={!this.state.muted}
            onChange={e => {
              this.setState({ muted: !e.target.checked });
            }}
          />{' '}
          <label for="mute">Sound</label>
          <button disabled={pos === posts.length - 1} onClick={this.next}>
            Next
          </button>
        </div>
        <Show post={posts[pos]} muted={this.state.muted} />
      </Swipeable>
    );
  }
}
