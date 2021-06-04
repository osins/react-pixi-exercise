const { Stage, Text, TextStyle , TilingSprite} = ReactPixi;

const App = () => (
<Stage width={375} height={812}>
<TilingSprite
    image={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/p2.jpeg'}
    width={375}
    height={812}
    tilePosition={{ x: 0, y: 0 }}
    tileScale={{ x: 0.1, y: 2 }}
  />
<Text
    text="Hello World"
    anchor={0.5}
    x={150}
    y={150}
    style={
    new PIXI.TextStyle({
        fontSize: 42,
        fill: "#000000",
    })
    }
  />
</Stage>
);

ReactDOM.render(<App />, document.getElementById("root"));