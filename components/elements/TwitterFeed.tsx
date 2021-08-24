const TwitterFeed = () => {
  return (
    <div className="my-10 shadow">
      <a
        className="twitter-timeline"
        data-height="500"
        href="https://twitter.com/wiserfunding?ref_src=twsrc%5Etfw"
      >
        Tweets by wiserfunding
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
  );
};

export default TwitterFeed;
