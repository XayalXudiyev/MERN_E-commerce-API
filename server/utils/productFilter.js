class PrductFilter {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

    // queryString={
    //   limit , page , keyword , category , price , rating , sort
    // }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        } : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {}
  pagination() {}
}

export default PrductFilter;
