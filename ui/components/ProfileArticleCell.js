export default class ProfileArticleCell extends Component {
    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.9}>
                <Row spacing={10}>
                    <Cell shrink>
                        <Image square xxsmall source={{ uri: item.image }} />
                    </Cell>
                    <Cell>
                        <Title left bolder upper>{item.title}</Title>
                        <Text>{item.summary}</Text>
                        <Status left subtle>{Module.timeSince(new Date(item.published)) + " ago by " + item.authorRef.name}</Status>
                    </Cell>
                </Row>
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
