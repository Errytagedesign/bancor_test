import man from '@/assets/man.png';

const Aside = () => {
  return (
    <section className='purple w-full md:w-[40%]'>
      <h2>Whats in it for you</h2>
      <figure className='w-full md:w-9/12 mx-auto my-10'>
        <img src={man} alt='man' />
      </figure>
      <article>
        <h3>AS A BUYER...</h3>
        <h4>
          You get to locate and connect with Local sellers and businesses in
          your neighbourhood
        </h4>
      </article>
      <article>
        <h3>AS A SELLER...</h3>
        <h4>
          What better way to reach a wider audience ready to purchase your
          products and Services
        </h4>
      </article>
    </section>
  );
};

export default Aside;
