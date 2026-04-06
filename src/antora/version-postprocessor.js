module.exports.register = function () {
  this.once("contentAggregated", ({ contentAggregate }) => {
    for (const bucket of contentAggregate) {
      switch (process.env.RELEASE_STRATEGY) {
        case "release":
          if (!/^\d+\.\d+$/.test(bucket.version)) {
            bucket.prerelease = true
	  }
          if (bucket.version == "main") {
	    bucket.version = "upcoming"
	  }
        break
        case "evolution":
          if (bucket.version == "main") {
            bucket.version = "current"
	  }
          else {
            bucket.prerelease = true
	  }
        break
      }
    }
  })
}
