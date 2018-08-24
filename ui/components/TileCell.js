export default class TileCell extends Component {
    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.9}>
                <ImageBackground banner full source={{ uri: item.image.path }} style={{ marginBottom: 8 }}>
                    <Tile bottom>
                        <Tile collapse shade padding={10}>
                            <Row>
                                <Cell>
                                    <Heading left bright bolder upper>{item.title}</Heading>
                                    <Status left bright>{Module.timeSince(item.published) + " ago by " + item.authorRef.name}</Status>
                                </Cell>
                                <Cell shrink>
                                    <Avatar rounded small source={{ uri: item.authorRef.avatar.path }} />
                                </Cell>
                            </Row>
                        </Tile>
                    </Tile>
                </ImageBackground>
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
