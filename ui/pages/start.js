export default class NewsPage extends Component {

    constructor() {
      super();
    
        this.state = {
            categoryKey: "",
            articles: [],
            filterText: "",
            refreshing: true 
        }
    }
  
    async componentWillMount() {
        // get key
        let key = await AsyncStorage.getItem("cat-key");
        if (key === null)
            key = "";

        // set category
        this.selectCategory(key);
    }

    render() {
	
        let cells = this.state.articles.map((item, i) => {
            return <ItemCell item={item} key={i} />
            });
    
let scroll = this.state.articles.length > 0 && (
  <ScrollView style={{flex:1,backgroundColor:Theme.contentBackgroundColor}}>
{ cells }
</ScrollView>
    )
	
		return (
			<View style={styles.container}>

        { this.state.refreshing && <View style={styles.updatingView}>
            <ActivityIndicator />
          </View> 
}
        
{ scroll }
        
{ this.state.articles.length == 0 &&  <View style={styles.unavailableView}>
    <Text style={styles.unavailableText}>News is currently unavailable</Text>
  </View>
}
        
<Menu>
  <MenuTrigger style={{height:44,borderTopWidth:0.5,borderTopColor:Theme.toolbarBorderColor,padding:10,backgroundColor:Theme.toolbarBackgroundColor}}>
            <Text size="normal" style={{color:Theme.toolbarTintColor}}>{this.state.filterText}</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => this.selectCategory("")}>
              <Text size="normal" style={styles.menuOption}>{"All"}</Text>
            </MenuOption>
{ Module.data.categories.map((cat, i) => {
    return (
      <MenuOption key={i} style={styles.menuItem} onSelect={() => this.selectCategory(cat.key)}>
        <Text size="normal" style={styles.menuOption}>{cat.name}</Text>
      </MenuOption>
                )
})
}
</MenuOptions>
</Menu>
</View>
		)
}

  selectCategory(key) {
      let cat = Module.data.categories.find(r => r.key == key);
      this.setState({
          categoryKey: key,
          filterText: cat ? cat.name : "All",
          articles: this.filterNewsByKey(key),
          refreshing: false
      });
      AsyncStorage.setItem("cat-key", key);
  }

filterNewsByKey(key) {
    if (!Module.data.articles)
        return [];
    if (key == "")
        return Module.data.articles;
    return Module.data.articles.filter(n => n.category == key);
}

}

class ItemCell extends Component {

    render() {
        const { item } = this.props;
  
        return (
          <View style={{padding:15}}>
            <Text size="tiny" style={{color:'#999'}}>{item.category.toUpperCase()}</Text>
            <Text size="large" style={{fontWeight:'500',marginBottom:5}}>{item.title}</Text>
            <Text size="small" style={{marginBottom:5}}>{item.summary}</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text size="tiny" style={{color:'#999'}}>{item.link}</Text>
            </TouchableOpacity>
          </View>
    )
}

}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    updatingView: {
        padding: 10
    },
    unavailableView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    unavailableText: {
        padding: 15,
        color: "#999",
        fontSize: 16
    },
    menuOption: {
        padding: 10,
        paddingTop: 5
    }
})