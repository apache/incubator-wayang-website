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
    title: 'Ultra-fast data processing',
    Svg: require('@site/static/img/svg/speed.svg').default,
    description: (
      <>
      In-situ federated data processing, up to 150x faster as centralized data platforms
      </>
    ),
  },
  {
    title: 'Application independence ',
    Svg: require('@site/static/img/svg/agnostic.svg').default,
    description: (
      <>
        Change three lines of code and move applications across multiple data processing engines.
      </>
    ),
  },
  {
    title: 'Data framework agnostic',
    Svg: require('@site/static/img/svg/api.svg').default,
    description: (
      <>
        Works with Apache Spark, PostgreSQL, Apache Flink, Java Streams, JDBC and more
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