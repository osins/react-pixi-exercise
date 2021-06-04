const { Stage, Text, TextStyle } = ReactPixi;

const App = () => (
<Stage x={0} y={0}>
<Text
    text="Hello World"
    anchor={0.5}
    x={150}
    y={150}
    style={
    new PIXI.TextStyle({
        fontSize: 42,
        fill: "#ffffff",
    })
    }
  />
</Stage>
);

ReactDOM.render(<App />, document.getElementById("root"));