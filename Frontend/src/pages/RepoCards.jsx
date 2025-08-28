import React from "react";

const RepoCards = ({ repos }) => {
  // Normalize: repos could be an array OR an APIResponse-like object
  const list = Array.isArray(repos) ? repos : (Array.isArray(repos?.data) ? repos.data : []);
  console.log("RepoCards received repos:", repos);

  if (!Array.isArray(list) || list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-5xl mb-4">📂</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No repositories found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any repositories to display. Try a different search or check back later.
        </p>
      </div>
    );
  }

  // Function to get language color
  const getLanguageColor = (language) => {
    const languageColors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      CSS: "#563d7c",
      HTML: "#e34c26",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Go: "#00ADD8",
      Rust: "#dea584",
      "C++": "#f34b7d",
      C: "#555555",
      Shell: "#89e051",
      Vue: "#41b883",
      React: "#61dafb",
      Swift: "#ffac45",
      Kotlin: "#A97BFF",
      Dart: "#00B4AB",
      Elixir: "#6e4a7e",
      Default: "#cccccc"
    };
    
    return languageColors[language] || languageColors.Default;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {list.map((item) => {
        const repo = item?.data ?? item;
        if (!repo) return null;

        const topics = Array.isArray(repo.topics) ? repo.topics : [];
        const language = repo.language || "Unknown";
        const languageColor = getLanguageColor(language);

        return (
          <div
            key={repo._id || repo.full_name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                      {repo.name}
                    </h2>
                    <span className="text-xs font-medium bg-white text-blue-600 px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
                      {repo.tag || "General"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                {repo.description || "No description available for this repository."}
              </p>

              {/* Language and stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: languageColor }}
                  ></span>
                  <span className="text-xs text-gray-600">{language}</span>
                </div>
                <div className="flex space-x-3 text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                    </svg>
                    {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm mb-4 bg-gray-50 p-2 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{repo.stars ?? 0}</div>
                  <div className="text-xs text-gray-500">Stars</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{repo.forks ?? 0}</div>
                  <div className="text-xs text-gray-500">Forks</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{repo.issues ?? 0}</div>
                  <div className="text-xs text-gray-500">Issues</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{repo.watchers ?? 0}</div>
                  <div className="text-xs text-gray-500">Watching</div>
                </div>
              </div>

              {/* Topics */}
              {topics.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="bg-blue-50 text-blue-700 px-2.5 py-1 text-xs rounded-full font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                    {topics.length > 4 && (
                      <span className="text-xs text-gray-500 font-medium">
                        +{topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Link */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-900 text-white rounded-lg py-2.5 hover:bg-gray-800 transition flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Repository
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RepoCards;