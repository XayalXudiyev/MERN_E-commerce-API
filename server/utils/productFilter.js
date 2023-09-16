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

  filter() {
    const queryCopy = { ...this.queryString };
    const deleteArea = ["keyword", "limit", "page"];
    dl.forEach((item) => delete queryCopy[item]);

    this.query = this.query.find(queryCopy);

    const queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultPerPage) {
    const activePage = this.queryString.page * 1 || 1;
    const skip = resultPerPage * (activePage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
    
  }
}

export default PrductFilter;
