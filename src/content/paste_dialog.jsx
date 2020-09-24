const React = require("react");

var msgs = [
    "Keep going! 👌",
    "Nice choice! 🤩",
    "Hummm, great! 🔥",
    "Looks good! 👀",
    "Here you go! 😎",
    "Let's do this! 🚀",
    "That rocks! 🤘",
];
    
    
function random(min , max){
    return Math.floor((Math.random() * (max - min + 1) + min));
}
    
class PasteDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show : props.show,
        }

        this.containerStyle = {
            position : "fixed",
            left : "0",
            top : "0",
            width: "100%",
            height : "100vh",
            display : "flex",
            jsutifyContent : "center",
            alignItems : "center",
            background: "#3333"
        }

        this.msgStyle = {
            display : "block",
            alignSelf : "center",
            background : "#fefefe",
            margin : "0 auto",
            padding : "20",
            borderRadius : "15",
            textAlign : "center"
        }
    }


    componentDidUpdate(prevProps , prevState) {
        // console.log(this.state , prevProps);
        if (prevProps.show !== this.props.show ) {
            this.setState({show : this.props.show});
            if(this.props.show){
                this.setTimer();
            }
        }
    }

    setTimer () {
        // console.log("timer working!");
        setTimeout(()=>{
            // this.setState({force_hide : true })
            this.props.onHide();
        } , 2000);
    }

    render(){
        return this.state.show ? (
            <div style={this.containerStyle} onClick={this.props.onHide}>
                <div style={this.msgStyle}>
                    <h4>{msgs[random(0,msgs.length - 1)]}</h4>
                    <p>now you can paste it</p>
                </div>
            </div>   
        ) : null;
    }
}

module.exports = PasteDialog;