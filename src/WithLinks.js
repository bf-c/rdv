import React, { Component } from 'react';
import './WithLinks.css';

function shuffled(inp) {
  const arr = inp.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default LinkConsumer =>
  class extends Component {
    state = { subreddit: null, sort: null, posts: [], links: [] };

    async componentDidMount() {
      const pathname = window.location.pathname;
      const matches = pathname.match(
        /^\/r\/([0-9a-zA-Z_]+)(\/[a-z]+)?(\/[a-z]+)?$/,
      );
      if (!matches) {
        if (pathname !== '/') {
          window.location.pathname = '/';
          return;
        }
      } else {
        const subreddit = matches[1];
        const sort = (matches[2] && matches[2].substr(1)) || 'hot';
        const duration = (matches[3] && matches[3].substr(1)) || 'day';
        this.setState({ subreddit, sort, duration });
        const resp = await fetch(
          `https://www.reddit.com/r/${subreddit}/${sort}.json?t=${duration}`,
        );
        const data = await resp.json();
        const posts = data.data.children
          .map(child => child.data)
          .filter(child => !child.is_self)
          .filter(child => !child.url.startsWith('https://www.reddit.com/'));
        console.log(posts);
        this.setState({ posts });
      }
    }

    handleLastReach = async () => {
      const { posts, subreddit, sort, duration } = this.state;
      const after =
        (posts && posts[posts.length - 1] && posts[posts.length - 1].name) ||
        null;
      if (after) {
        const resp = await fetch(
          `https://www.reddit.com/r/${subreddit}/${sort}.json?t=${duration}?after=${after}`,
        );
        const data = await resp.json();
        const newPosts = data.data.children
          .map(child => child.data)
          .filter(child => !child.is_self)
          .filter(child => !child.url.startsWith('https://www.reddit.com/'));
        this.setState(({ posts }) => {
          const milan = [...posts, ...newPosts];
          console.warn({ milan });
          return { posts: milan };
        });
      }
    };

    render() {
      if (this.state.posts.length === 0) {
        return (
          <div
            style={{
              backgroundColor: 'black',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ color: 'white' }}>Loading, please wait...</div>
          </div>
        );
      }
      return (
        <LinkConsumer
          onLastReach={this.handleLastReach.bind(this)}
          links={this.state.posts.map(post => post.url)}
        />
      );
    }
  };
