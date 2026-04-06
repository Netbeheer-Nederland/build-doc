module.exports.register = function () {
  this.once("contentAggregated", ({ contentAggregate }) => {
    for (const bucket of contentAggregate) {
      console.log("my object: %o", bucket)
      switch (process.env.RELEASE_STRATEGY) {
        case "release":
          if (!/^\d+\.\d+$/.test(bucket.version))
            bucket.prerelease = true
          else if (bucket.version == "main")
	    bucket.version = "next"
        break
        case "evolution":
          if (bucket.version == "main")
            bucket.version = "current"
          else
            bucket.prerelease = true
        break
      }
    }
  })
}
