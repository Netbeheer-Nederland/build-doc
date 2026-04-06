module.exports.register = function () {
  this.once("contentAggregated", ({ contentAggregate }) => {
    for (const bucket of contentAggregate) {
      /* Draft branches. */
      if (/^draft-/.test(bucket.version)) {
        const [_, workName] = /^draft-(.*)$/.exec(bucket.version)
        bucket.displayVersion = `${workName} (draft)`
      }

      switch (process.env.RELEASE_STRATEGY) {
        case "release":
          if (!/^\d+\.\d+$/.test(bucket.version)) {
            bucket.prerelease = true
	  }
          if (bucket.version == "main") {
	    bucket.version = "upcoming"
            bucket.displayVersion = "upcoming"
	  }
        break
        case "evolution":
          if (bucket.version == "main") {
            bucket.version = "current"
            bucket.displayVersion = "current"
	  }
          else {
            bucket.prerelease = true
	  }
        break
      }
    }
  })
}
