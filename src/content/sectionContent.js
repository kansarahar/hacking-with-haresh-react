import Selfie from '../assets/images/selfie.png';
import BlockI from '../assets/images/blockI.jpg';
import CapOne from '../assets/images/capone.jpg';
import LNN from '../assets/images/lnn.png'
import Raytracing from '../assets/images/raytracing.png'
import OpenGL from '../assets/images/opengl.png'

const sectionContent = [
  {
    section: 'About Me',
    key: 0,
    content: [
      {
        header: 'Introductions',
        image: Selfie,
        imageAlt: 'selfie',
        link: 'https://github.com/kansarahar',
        body: `
          <div>
            <div>Hi there! My name is Haresh Kansara and I am passionate about all things math, physics, and computer science. This site is a little showcase of some of the stuff I've been working on (I strongly recommend viewing on a desktop).</div>
            <div>&nbsp</div>
            <div>Explore and enjoy!</div>
          </div>
        `,
      },
      {
        header: 'Education',
        image: BlockI,
        imageAlt: 'block I',
        link: 'https://illinois.edu/',
        body: `
          <div>
            <div><strong>B.S. in Engineering Physics with concentration in Computer Science</strong></div>
            <div><i>University of Illinois at Urbana-Champaign</i></div>
            <div>GPA: 3.61/4.00</div>
          </div>
        `,
      },
      {
        header: 'Work Experience',
        image: CapOne,
        imageAlt: 'capital one logo',
        link: 'https://www.linkedin.com/in/kansarahar/',
        body: `
          <div>
            I am currently working for Capital One as a data engineer, and I also have prior experience as a front-end and back-end developer.
            Check out my <span href=#>LinkedIn</span> page for more info!
          </div>
        `,
      },
      {
        header: 'Contact Info',
        imageAlt: 'linkedIn',
        body: `
          <div>
            <div>
              <a href='https://www.linkedin.com/in/kansarahar/' style="text-decoration: none; color: inherit;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
                <span>linkedin.com/in/kansarahar/</span>
              </a>
            </div>
            <div>
              <a href='https://github.com/kansarahar' style="text-decoration: none; color: inherit;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                <span>github.com/kansarahar</span>
              </a>
            </div>
            <div>
              <a href='https://kansarahar@gmail.com' style="text-decoration: none; color: inherit;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
                <span>kansarahar@gmail.com</span>
              </a>
            </div>
          </div>  
        `,
      }
    ]
  },
  {
    section: 'Physics',
    key: 1,
    content: [
      {
        header: 'Lagrangian Neural Networks',
        link: 'https://github.com/kansarahar/LagrangianNeuralNetworks',
        image: LNN,
        imageAlt: 'sample from lnn project',
        body: `
          <div>
            In physics, the Lagrangian is a function that summarizes the dynamics of a system, and perhaps more importantly it can be used to find conservation laws for the system.
            What if we have a system so complex that we cannot simply write out the Lagrangian? Here I have built a neural network that learns to approximate the lagrangian of a physical system,
            and thus conserves energy better than a traditional neural network would were it to try and replicate this behavior.
          </div>
        `,
      },
    ],
  },
  {
    section: 'Machine Learning',
    key: 2,
    content: [
      {
        header: 'Lagrangian Neural Networks',
        link: 'https://github.com/kansarahar/LagrangianNeuralNetworks',
        image: LNN,
        imageAlt: 'sample from lnn project',
        body: `
          <div>
            In physics, the Lagrangian is a function that summarizes the dynamics of a system, and perhaps more importantly it can be used to find conservation laws for the system.
            What if we have a system so complex that we cannot simply write out the Lagrangian? Here I have built a neural network that learns to approximate the lagrangian of a physical system,
            and thus conserves energy better than a traditional neural network would were it to try and replicate this behavior. 
          </div>
        `,
      },
      {
        header: 'Image Caption Generator',
        link: 'https://github.com/kansarahar/image_caption_generator',
        body: `
          <div>
            This project aims to be able to provide captions for any given image.
            The model consists of a pretrained image classification network in conjunction with an LSTM network being trained on the flickr30k dataset.
          </div>
        `,
      },
      {
        header: 'AWS Deepracer',
        link: 'https://github.com/kansarahar/deepracer',
        body: `
          <div>
            A repository for sharing reward models and performing investigative analyses for AWS Deepracer - an autonomous vehicle racing competition.
          </div>
        `,
      },
    ],
  },
  {
    section: 'Graphics',
    key: 3,
    content: [
      {
        header: 'OpenGL Renderer',
        image: OpenGL,
        imageAlt: 'OpenGL logo',
        link: 'https://github.com/kansarahar/OpenGLRenderer',
        body: `
          <div>
            A sandbox for learning how to use OpenGL to build a rendering engine
          </div>
        `,
      },
      {
        header: 'Ray Tracing',
        image: Raytracing,
        imageAlt: 'picture produced from this ray tracer',
        link: 'https://github.com/kansarahar/ray_tracing',
        body: `
          <div>
            A simple ray tracing application that can render triangles and implicit surfaces.
          </div>
        `,
      },
    ],
  }
];

export default sectionContent;