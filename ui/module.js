export default class NewsModule extends Module {

    articles = [];

    async moduleWillLoad() {

        // populate our articles
        if (this.data.articles) {
            this.articles = this.data.articles.map(a => {
                a.authorRef = this.findAuthor(a.author) || {};
                return a;
            }).sort(function(a, b) {
                return new Date(b.published) - new Date(a.published);
            });
        }

        // get key
        let key = await AsyncStorage.getItem("cat-key");
        if (key === null)
            key = "";

        // set category
        this.selectCategory(key);
    }

    getInitialPageId() {
        return 'start'; // this.options.get('layout')
    }

    selectCategory(id) {
        let cat = this.data.categories.find(r => r.id == id);
        this.setState({
            categoryKey: id,
            filterText: cat ? cat.name : "All",
            articles: this.filterNewsByKey(id),
            refreshing: false
        });
        AsyncStorage.setItem("cat-key", id);
    }

    filterNewsByKey(key) {
        if (key == "")
            return this.articles;
        return this.articles.filter(n => n.category == key);
    }

    findAuthor(id) {
        return this.data.authors.find(a => a.id === id);
    }

    findAuthorsArticles(id) {
        return this.articles.filter(a => a.author === id);
    }

    get noResultMessage() {
        return this.options.get("no-result-message", "No articles found");
    }

    timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + "yr";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + "mo";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + "d";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + "h";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + "min";
        }

        return Math.floor(seconds) + "s";
    }

}
