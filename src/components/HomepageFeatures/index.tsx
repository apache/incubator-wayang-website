import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Decentralized Data Processing',
    Svg: require('@site/static/img/svg/speed.svg').default,
    description: (
      <>
      Seamlessly handle distributed datasets while preserving privacy.
      </>
    ),
  },
  {
    title: 'Compliance-Ready',
    Svg: require('@site/static/img/svg/agnostic.svg').default,
    description: (
      <>
        Ensures alignment with GDPR, HIPAA, and other data privacy regulations.
      </>
    ),
  },
  {
    title: 'Multi-Backend Support',
    Svg: require('@site/static/img/svg/api.svg').default,
    description: (
      <>
        Integrates with popular ML frameworks for efficient federated learning workflows.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
