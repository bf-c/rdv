import React, { Component } from 'react';
import './Show.css';

const tumblr_re = /^\d+?\.media\.tumblr\.com$/;

const gfycatStoreKey = 'gfycatUrls';
const GfycatStore = (() => {
  let store;
  try {
    store = JSON.parse(localStorage.getItem(gfycatStoreKey) || '{}');
  } catch (e) {
    store = {};
  }

  const cleanExpired = () => {
    const now = new Date();
    for (const id in store) {
      if (store[id].expiresAt <= now) delete store[id];
    }
  };

  return {
    get: async gfyId => {
      cleanExpired();
      if (!(gfyId in store)) {
        const resp = await fetch(`https://api.gfycat.com/v1/gfycats/${gfyId}`);
        const json = await resp.json();
        store[gfyId] = {
          url:
            json.gfyItem.webmUrl || json.gfyItem.mp4Url || json.gfyItem.gifUrl,
          expiresAt: new Date().getTime() + 1 * 24 * 60 * 60 * 1000, // 1 day
        };
      }
      localStorage.setItem(gfycatStoreKey, JSON.stringify(store));
      return store[gfyId].url;
    },
  };
})();

class Gfycat extends Component {
  constructor(props) {
    super(props);
    this.state = { webmUrl: null };
    GfycatStore.get(props.url.pathname.split('/').pop())
      .then(webmUrl => this.setState({ webmUrl }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <video
        autoPlay
        loop
        controls
        src={this.state.webmUrl}
        muted={this.props.muted}
      />
    );
  }
}

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  imgLoaded = () => this.setState({ loading: false });

  render() {
    const { src, title, ...restProps } = this.props;
    return (
      <iframe
        className={this.state.loading ? 'iframe-loading' : ''}
        onLoad={this.imgLoaded}
        title={title}
        src={src}
        frameBorder="0"
        scrolling="no"
        {...restProps}
      />
    );
  }
}

class Img extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: false };
  }

  imgLoaded = () => this.setState({ loading: false });

  imgErrored = () => this.setState({ loading: false, error: true });

  render() {
    const className = this.state.loading
      ? 'loading'
      : this.state.error
      ? 'error'
      : '';
    return (
      <img
        className={className}
        alt=""
        src={this.props.url.href}
        onLoad={this.imgLoaded}
        onError={this.imgErrored}
        style={{ objectFit: 'contain' }}
      />
    );
  }
}

const Strategy = ({ url, muted }) => {
  let title, src;
  switch (true) {
    case url.host === 'i.imgur.com' || url.host === 'imgur.com':
      if (url.pathname.slice(0, 3) === '/a/') {
        title = 'imgur';
        src =
          url.protocol +
          '//imgur.com' +
          url.pathname.replace('.jpg', '') +
          '/embed?pub=true';
        break;
      } else if (!url.pathname.includes('.')) {
        url.pathname += '.jpg';
      }
    // eslint-disable-next-line -- FALLTHROUGH
    case url.host === 'i.redd.it':
    case tumblr_re.test(url.host):
      return <Img url={url} />;
    case url.host === 'gfycat.com':
      return <Gfycat url={url} muted={muted} />;
    case url.host === 'www.xvideos.com':
      title = 'xvideos';
      src =
        url.origin + '/embedframe/' + url.pathname.match(/\/video(\d+)\//)[1];
      break;
    case url.host.endsWith('.pornhub.com') || url.host.endsWith('.pornhub.org'):
      title = 'pornhub';
      src = 'https://www.pornhub.com/embed/' + url.searchParams.get('viewkey');
      break;
    case url.host === 'xhamster.com':
      title = 'xhamster';
      src = url.origin + '/embed/' + url.pathname.split('/')[2];
      break;
    case url.host === 'www.hentai-foundry.com':
      const [username, pic_id] = url.pathname
        .match(/^\/pictures\/user\/(.*)\/(.*)\//)
        .slice(1);
      const src_base = [
        'https://pictures.hentai-foundry.com',
        username[0].toLowerCase(),
        username,
        pic_id,
      ].join('/');
      return (
        <div
          className="img"
          style={{
            backgroundImage: ['png', 'jpg']
              .map(ext => `url(${src_base}.${ext})`)
              .join(','),
          }}
        />
      );
    default:
      title = 'default';
      src = url.href;
  }
  return <Iframe src={src} title={title} />;
};

export default function Show({ post, style, muted }) {
  const { url: source, permalink } = post;
  console.log(source);
  const url = new URL(source);
  return (
    <div key={source} className="item-container" style={style}>
      <div
        style={{
          flexGrow: 0,
          flexShrink: 0,
          paddingTop: 0,
          color: 'white',
        }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          Source
        </a>{' '}
        <a
          href={'https://www.reddit.com' + permalink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Reddit
        </a>
      </div>
      <Strategy url={url} muted={muted} />
    </div>
  );
}
