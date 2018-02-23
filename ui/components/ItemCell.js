export default class ItemCell extends Component {
    render() {
        const { item } = this.props;

        return (
            <View style={{ padding: 15 }}>
                <Heading>{item.title}</Heading>
                <Text>{item.summary}</Text>
                <Status left>{Module.timeSince(new Date(item.published)) + " ago by " + item.authorRef.name}</Status>
            </View>
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
