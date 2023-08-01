
import { Configuration, OpenAIApi } from "openai";
import { hashString } from "./graph-utils";
import _ from 'lodash';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateMessage(prompt: string){
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}],
  });
  return chatCompletion.data.choices[0].message?.content || '';
}


export async function generateNextTechOptions(recentTech: Tech[], currentYear: number){
  const OPTION_AMT = 5;

  const prompt = `
    Making up your own tech advancement, similar to that of a tech tree in a 4X strategy game like Civilization, what top ${OPTION_AMT} innovations would most likely come next after the following tech advancements?
    The year is ${currentYear > 0 ? `${Math.abs(currentYear)} AD` : `${Math.abs(currentYear)} BC`}.
    Please only give the name and description of each piece of tech. Only respond with the top ${OPTION_AMT} most probable pieces of tech to be invented next.

    Here's an example of what the output should look like:
    - Gunpowder: Also known as black powder, is a chemical explosive and propellant that revolutionized warfare. It is traditionally composed of three main ingredients: saltpeter (potassium nitrate), charcoal, and sulfur. The precise composition can vary depending on the intended use.
    - Writing: The development of a system of visual representation of language, allowing for the recording and communication of information across time and space.
    - Metalworking: The discovery and utilization of various metals, such as copper and bronze, for tools and weapons, leading to significant advancements in craftsmanship and warfare.
    - Pottery: The creation and use of heat-resistant clay vessels for cooking, storage, and trade, greatly improving food preparation and preservation methods.
    - Irrigation: The development of techniques and systems for artificially supplying water to crops, leading to increased agricultural productivity and the ability to cultivate more land.

    Here are the recent tech advancements:
    ${recentTech.map((tech) => (`- ${tech.name}`)).join('\n')}
  `;
  console.log(prompt);
  
  const completion = await generateMessage(prompt);
  return getTechFromCompletion(completion, recentTech, currentYear + getNextTimeSkip(currentYear));

}

export function getTechFromCompletion(completion: string, prevTech: Tech[], year: number): Tech[] {
  console.log(completion);
  return completion.split('\n').filter((line) => line.trim() !== '').map((line) => {
    const [rawName, rawDescription] = line.trim().split(':');
    const name = rawName.replace('- ', '').trim();
    const description = rawDescription.trim();
    return {
      id: hashString(name),
      name: name,
      description: description,
      prerequisites: getRecentTech(prevTech, 5).map((tech) => tech.id),
      year: year,
    };
  });
}


/**
 * Returns the most recent tech advancements
 * @param techTree 
 * @param size - Optional, defaults to 10
 * @returns - The most recent {size} tech advancements
 */
export function getRecentTech(techTree: Tech[], size?: number): Tech[] {
  return _.cloneDeep(techTree).sort((a, b) => b.year > a.year ? 1 : -1).slice(0, size || 10);
}


export function getNextTimeSkip(currentTime: number){

  if(currentTime >= 2000){
    return 5;
  } else if(currentTime >= 1900){
    return 10;
  } else if(currentTime >= 1800){
    return 20;
  } else if(currentTime >= 1500){
    return 50;
  } else if(currentTime >= 1000){
    return 100;
  } else if(currentTime >= 500){
    return 150;
  } else if(currentTime >= 0){
    return 200;
  } else if(currentTime >= -1000){
    return 250;
  } else if(currentTime >= -2000){
    return 500;
  } else {
    return 1000;
  }

}


export function removeDuplicateTech(techTree: Tech[]): Tech[] {
  return _.uniqBy(techTree, (tech) => tech.id);
}
