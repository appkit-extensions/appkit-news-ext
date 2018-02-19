export default class GreenButton extends Component {

	render() {
		return (
			<TouchableOpacity style={{backgroundColor:'green'}} onPress={() => this.props.onPress()}>
                <Text style={{color:'white'}}>{this.props.title}</Text>
            </TouchableOpacity>
		)
	}

}

let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		fontSize: 20
	}
})