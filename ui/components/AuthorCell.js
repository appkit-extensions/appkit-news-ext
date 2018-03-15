export default class AuthorCell extends Component {

	render() {
        const { item } = this.props;

        // shorten bio
        let bio = item.bio
        if (bio.length > 150) {
            bio = bio.substring(0, 150) + '...'
        }

        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.9}>
                <Row spacing={10} style={{backgroundColor:'#fff'}}>
                    <Cell shrink>
                        <Avatar medium rounded source={{ uri: item.avatar.path }} />
                    </Cell>
                    <Cell>
                        <Text left bolder upper>{item.name}</Text>
                        <Caption>{bio}</Caption>
                    </Cell>
                </Row>
                <Divider full height={1} />
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
