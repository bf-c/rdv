import React, { Component } from 'react';
import './WithLinks.css';

export default LinkConsumer =>
  class extends Component {
    state = {
      subreddit: null,
      sort: null,
      duration: null,
      posts: [],
      links: [],
      isHome: true,
      loading: true,
    };

    componentDidMount() {
      this.handleHashChange();
      window.addEventListener('hashchange', this.handleHashChange);
    }

    componentWillUnmount() {
      window.removeEventListener('hashchange', this.handleHashChange);
    }

    handleHashChange = async () => {
      const pathname = window.location.hash;
      const matches = pathname.match(
        /^#\/r\/([0-9a-zA-Z_]+)\/?(\/[a-z]+)?\/?(\/[a-z]+)?\/?$/,
      );
      if (!matches) {
        this.setState({ isHome: true });
        if (pathname !== '') {
          window.location.hash = '';
          return;
        }
      } else {
        this.setState({ isHome: false, loading: true });
        const subreddit = matches[1];
        const sort = (matches[2] && matches[2].substr(1)) || 'hot';
        const duration = (matches[3] && matches[3].substr(1)) || 'day';
        const resp = await fetch(
          `https://www.reddit.com/r/${subreddit}/${sort}.json?t=${duration}`,
        );
        const data = await resp.json();
        const posts = data.data.children
          .map(child => child.data)
          .filter(child => !child.is_self)
          .filter(child => !child.url.startsWith('https://www.reddit.com/'));
        console.log(posts);
        this.setState({ subreddit, sort, duration, posts, loading: false });
      }
    };

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
        this.setState(({ posts }) => ({ posts: [...posts, ...newPosts] }));
      }
    };

    render() {
      if (this.state.isHome) {
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
            <div style={{ color: 'white' }}>Welcome</div>
          </div>
        );
      }
      if (this.state.loading || this.state.posts.length === 0) {
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
          posts={this.state.posts}
          subreddit={this.state.subreddit}
          sort={this.state.sort}
          duration={this.state.duration}
        />
      );
    }
  };
