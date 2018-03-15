export default class NewsModule extends Module {

    state = {
        articles: undefined,
        articlesUnfiltered: [],
        categories: [],
        authors: [],
        latestArticle: null,
        categoryId: '',
        filterText: '',
        dataError: null
    }

    async moduleDataDidUpdate(data, err) {

        // get category id
        let id = await AsyncStorage.getItem('cat-id') || ''

        // save latest article
        const latest = data.articles.length ? data.articles[0] : null

        // add data to state
        this.setState({
            categoryId: id,
            articlesUnfiltered: data.articles,
            categories: data.categories,
            authors: data.authors,
            latestArticle: latest,
            dataError: err
        })

        // set category
        this.selectCategory(this.state.categoryId);
    }
    
    selectCategory(id) {
        let cat = this.state.categories.find(c => c.id === id)
        this.setState({
            categoryId: id,
            filterText: cat ? cat.name : "All",
            articles: this.filterNewsByCategory(id)
        });
        AsyncStorage.setItem("cat-id", id)
    }

    filterNewsByCategory(id) {
        if (id == "")
            return this.state.articlesUnfiltered
        return this.state.articlesUnfiltered.filter(n => n.category == id)
    }

    findAuthor(id) {
        return this.state.authors.find(a => a.id === id)
    }

    findAuthorsArticles(id) {
        return this.state.articles.filter(a => a.author === id)
    }

    get noResultMessage() {
        return this.options.get("no-result-message", "No articles found")
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
