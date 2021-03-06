export default class AuthorsPage extends Component {

    static pageOptions = {
        title: "Authors"
    };

	render() {
        const authors = Module.state.authors;

        let cells = authors.map((item, i) => {
            return <AuthorCell item={item} key={i} onPress={() => Module.pages.open("profile", item)} />
        });

		return (
			<ScrollView style={styles.container}>
				{cells}
			</ScrollView>
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
