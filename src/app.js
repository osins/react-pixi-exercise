const { Stage, Text, TextStyle , TilingSprite} = ReactPixi;

const App = () => (
<Stage width={375} height={812} options={{ backgroundColor: 0xeef1f5 }}>
<TilingSprite
    image={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/p2.jpeg'}
    width={375}
    height={812}
    tilePosition={{ x: 100, y: 150 }}
    tileScale={{ x: 0.1, y: 2 }}
  />
<Text
    text="Hello World"
    anchor={0.5}
    x={150}
    y={150}
    style={
    new PIXI.TextStyle({
        fontFamily : 'Arial', 
        fontSize: 42,
        fill: "#000000",
        align: "left",
    })
    }
  />
</Stage>
);

ReactDOM.render(<App />, document.getElementById("root"));