import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({
  title,
  description,
  type,
  url,
  siteName,
  image,
  twitterImage,
  twitterCard = 'summary_large_image',
  imageWidth = 1100,
  imageHeight = 630,
  twitterHandle,
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName || title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content={imageWidth} />
          <meta property="og:image:height" content={imageHeight} />
        </>
      )}
      {/* End Open Graph / Facebook */}

      {/* Twitter */}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      <meta property="twitter:card" content={twitterCard} />
      {twitterImage && <meta property="twitter:image" content={twitterImage} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter */}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  siteName: PropTypes.string,
  image: PropTypes.string,
  twitterImage: PropTypes.string,
  twitterCard: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  twitterHandle: PropTypes.string,
};

SEO.defaultProps = {
  name: '',
  url: '',
  siteName: '',
  image: '',
  twitterImage: '',
  twitterCard: 'summary_large_image',
  imageWidth: 1100,
  imageHeight: 630,
  twitterHandle: '',
};
