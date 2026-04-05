module.exports.register = function () {
  this.once("contentAggregated", ({ contentAggregate }) => {
    for (const bucket of contentAggregate) {
      switch (process.env.RELEASE_STRATEGY) {
        case "release":
          if (!/^\d+\.\d+$/.test(bucket.version))
            bucket.prerelease = true
          else if (bucket.version == "main")
	    bucket.version = "next"
        break
        case "evolution":
          if (bucket.version != "main")
            bucket.prerelease = true
          else
            bucket.version = "current"
        break
      }
    }
  })
}


/* TODO: Safest logic rewrite:

If strat = release: only tags are releases everything else is prerelease
   strat = evolution: only main branch is release, everything else is prerelease
*/
