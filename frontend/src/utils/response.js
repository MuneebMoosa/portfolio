import brain from "../data/chatbotBrain"

const generateResponse = (input) => {
  const query = input.toLowerCase().trim();

  for (const item of brain.faq) {
    if (
      item.patterns.some((pattern) =>
        query.includes(pattern)
      )
    ) {
      return item.response;
    }
  }

  return brain.fallback;
};

export default generateResponse;