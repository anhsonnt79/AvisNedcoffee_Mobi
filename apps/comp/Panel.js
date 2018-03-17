import React,{Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

export default class Panel extends Component{
    constructor(props){
        super(props);
        this.icons = {
            'up': require('../img/back-arrow-64.png'),
            'down'  : require('../img/expand-arrow-64.png')
        };

        this.state = {
            title: props.title,
            expanded: true,
            animation: new Animated.Value()
        };
    }

    toggle(){
        
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up']; 
        }

        return ( 
            <View style={styles.container} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body}>
                    {this.props.children}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});