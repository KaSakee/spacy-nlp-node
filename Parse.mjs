import { addCache, findCache } from "./Cache.mjs";
export default (ProcessEmitter, pyshell, { TAG = "Unknown", query = "" }) => {
  if (!query || query.length <= 0) return Type;

  const cacheItem = findCache(query);

  if (cacheItem) return ProcessEmitter.emit(TAG, cacheItem);

  // console.log("Sending!");
  pyshell.send(
    JSON.stringify({ query: query.replace(/'|"/gim, ""), tag: TAG })
  );

  pyshell.on("message", function (message) {
    const { results, tag } = JSON.parse(
      message.replace(/"/gim, "'").replace(/'/gim, '"')
    );

    addCache(query, results);

    // console.log(tag);

    ProcessEmitter.emit(tag, results);
  });
};
