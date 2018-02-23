export default class TileCell extends Component {
    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.9}>
                <Image banner full source={{ uri: item.image }} style={{ marginBottom: 8 }}>
                    <Tile bottom>
                        <Tile shrink shade padding={10}>
                            <Row>
                                <Cell>
                                    <Heading left bright bolder upper>{item.title}</Heading>
                                    <Status left bright>{Module.timeSince(new Date(item.published)) + " ago by " + item.authorRef.name}</Status>
                                </Cell>
                                <Cell shrink>
                                    <Avatar rounded small source={{ uri: item.authorRef.avatar }} />
                                </Cell>
                            </Row>
                        </Tile>
                    </Tile>
                </Image>
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
