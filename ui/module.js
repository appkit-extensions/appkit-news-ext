export default class NewsModule extends Module {

    live = false

    state = {
        articles: [],
        articlesUnfiltered: [],
        categories: [],
        authors: [],
        latestArticle: null,
        categoryId: null,
        filterText: '',
        refreshing: false,
        err: null
    }

    moduleWillLoad() {
        this.live = this.options.get('enable-live-updates', false)
        if (this.live) {
            this.dataUpdateFrequency = 60 * 5
        }
    }

    moduleDataWillUpdate(fromCache) {
        return this.loadModuleContent(this.live, fromCache)
    }
    
    async moduleDataDidUpdate(data, refreshing, err) {
        if (!data || err) {
            this.setState({ refreshing, err })
            return
        }

        // save latest article
        const latest = data.articles && data.articles.length ? data.articles[0] : null

        // update state
        this.setState({
            articlesUnfiltered: data.articles || [],
            categories: data.categories || [],
            authors: data.authors || [],
            latestArticle: latest,
            err,
            refreshing
        })

        // get category id
        const id = await AsyncStorage.getItem('cat-id') || ''

        // set category
        this.selectCategory(id);
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
