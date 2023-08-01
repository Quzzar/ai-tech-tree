

export function getGraphEdges(allTech: Tech[]): {
  source: string,
  target: string,
  id: string,
  label: string
}[] {
  return allTech.flatMap((tech) => {
    return tech.prerequisites.map((prereqId) => {
      return {
        source: prereqId+'',
        target: tech.id+'',
        id: `${prereqId}-${tech.id}`,
        label: `${prereqId}-${tech.id}`,
      };
    });
  });
}


export function getGraphNodes(allTech: Tech[]): {
  id: string,
  label: string
}[] {
  return allTech.map((tech) => {
    return {
      id: tech.id+'',
      label: tech.name,
    };
  });
}


/**
 * Given a string, returns a number between 0 and range that is consistent for the same string.
 * @param str
 * @param range - Optional. Defaults to 1000000
 * @returns - Consistent number between 0 and range
 */
export function hashString(str: string, range?: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % (range || 1000000);
  }
  return hash;
}


