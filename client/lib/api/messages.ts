import { MessageData } from "../types/message";

export const MESSAGES: MessageData[] = [
  {
    id: '1',
    sender: 'user_requester_003',
    timestamp: '10:23 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8K1MlQZnJhh67WYaiivjgtJm7F8nKg65LLhs-59jMyXx7YnGV9eZnSWkGOhMLaNk-uSD-6dZMvjvp0udn44aoBYPJ6eywSUzaksz-af0lV2SB1ILoGKhB5LnMuZFeXvrsOIBJobBFtOuNtdjEGkKJrept0e8Ec7-aQZE6w0JD6pvm2i7mypjvNr0B9EIPspaDdCAZBcQ5e_K8pfk_wjX0F6wxd-M15SVlqZD_N5wr_XrjkboZwjez1boi0p7v_iHt8CI7As1defnr',
    content: '<p>Hi, I cannot access the VPN since this morning. It keeps timing out and giving me an error code 503.</p><p class="mt-2">I\'ve attached a screenshot of the error.</p>',
    attachment: { name: 'error_screenshot.png', size: '1.2 MB' }
  },
  {
    id: '2',
    isInternal: true,
    sender: 'System',
    timestamp: '10:45 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqrIGM_XKrfsaCPjoeA4O6O30aZvny1ON8XKnGi15SW5zi8wjtRnpikWtkYd1beJQsxBnpHAfg2f-8x2-yWk8FPAyfntMcQUNOl1Vw6UrWAbd7ATEJepYDcaDRxjQ-arzYYBlxOL2xAvGyyr5AXrA7-f3uAF2_ENSXc4t7C6u5Ah26NX4pJCeIBFl7ipjkdcQw9E_u9igziuRvviwrkNc-OlRknvgEkKu2wv2I7R8RFbG8xG-XVGscKcprevCx9HT-yMaznHvDRrwc',
    content: 'Checking backend logs, seeing auth errors for this user ID. It seems like a token expiration issue on the server side.'
  },
  {
    id: '3',
    sender: 'user_agent_002',
    timestamp: '10:48 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAkV3TCgQDWZ6v_g2Mf2bGOEMQdrFOXA4ruhZt5KWF2WmWhOtOcrUjp6sAChrBcgVjdPVyJe1-1DNs6lj0ceQ5kIfReo7GgopfqX0cjcnyKD8uvDufgVxeb60RSOdV5jpf4Qml3Vnnaih3DLF7rv49CNRfE6fZ9drmP_b7wPgZPOlVo5n1OAtnpI_bLkwWe26XlIh5_e0Cg8MoZ1NCl5Qapi13q7wuJkjaVi0r2s8D4kNjQowopJlyRwu1Zg8GWoYbP6bede1J5_sf',
    content: '<p>Hello Ahmed, thanks for reporting this. We are aware of a small glitch affecting some accounts.</p><p class="mt-2">I\'m resetting your credentials now. Please try again in 5 minutes.</p>'
  }
];


export const getMessages = () => {
    return MESSAGES;
}

export const addMessage = (message : MessageData)=>{
  MESSAGES.push(message)
}