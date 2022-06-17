//-------------------------------------------------------------------------------------
//-- File. . . :  config.js
//-- Bevat . . :  Template voor de  configuratie voor respec
//--              Gebaseerd op https://github.com/Geonovum/respec/wiki
//--              Deze file moet worden neergezet in de root-directory van de
//--              betreffende standaard.
//-- Door. . . :  Frank Terpstra/Jan van Gelder
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-- Log . . . :  20180615 - FT  - Initiele versie
//-- . . . . . :  20181106 - JvG - verplaatst naar root KP-APIs
//-------------------------------------------------------------------------------------

var respecConfig =
{
  specStatus: "ED",
  specType: "ST",
  // format: "markdown",
  pubDomain: "api",
  shortName: "oauth",

  publishDate: "2022-06-17",
  previousPublishDate: "2020-07-09",
  
  publishVersion: "v1.1",
  previousPublisversion: "1.0",

  //previousMaturity: "GN-CV",
  editors:
    [
      {
        name: "Frank Terpstra",
        company: "Geonovum",
        companyURL: "http://www.geonovum.nl/",
      },
      {
        name: "Jan van Gelder",
        company: "Geonovum",
        companyURL: "http://www.geonovum.nl/",
      }
      {
        name: "Alexander Green",
        company: "Logius",
        companyURL: "http://www.logius.nl/",
      }
      {
        name: "Martin van der Plas",
        company: "Logius",
        companyURL: "http://www.logius.nl/",
        mailto: "api@logius.nl",
      }
    ],
  authors:
    [
      {
        name: "Jaron Azaria",
        company: "Logius",
        companyURL: "http://www.logius.nl/",
      },
      {
        name: "Martin Borgman",
        company: "Kadaster",
        companyURL: "http://www.kadaster.nl/",
      },
      {
        name: "Marc Fleischeuers",
        company: "Kennisnet",
        companyURL: "http://www.kennisnet.nl/",
      },
      {
        name: "Peter Haasnoot",
        company: "Logius",
        companyURL: "http://www.logius.nl/",
      },
      {
        name: "Leon van der Ree",
        company: "Logius",
        companyURL: "http://www.logius.nl/",
      },
      {
        name: "Bob te Riele",
        company: "RvIG",
        companyURL: "http://www.rvig.nl/",
      },
      {
        name: "Remco Schaar",
        company: "Logius",
        companyURL: "http://www.logius.nl/",
      },
      {
        name: "Frank Terpstra",
        company: "Geonovum",
        companyURL: "http://geonovum.nl/",
      },
      {
        name: "Jan Jaap Zoutendijk",
        company: "Rijkswaterstaat",
        companyURL: "http://www.rws.nl/",
      },
    ],
  github: "https://github.com/Logius-standaarden/OAuth-NL-profiel/",
  issueBase: "https://github.com/Logius-standaarden/OAuth-NL-profiel/issues",
  licence: "cc-by-nd",

  nl_github: {
    issueBase: "https://github.com/Logius-standaarden/OAuth-NL-profiel/issues",
    revision: "https://github.com/Logius-standaarden/OAuth-NL-profiel/commits",
    pullsBase: "https://github.com/Logius-standaarden/OAuth-NL-profiel/pulls",
  },

  // Controls if linked "§" section markers are added to a document
  addSectionLinks: true,

  // this parameter will add the tag_name of the latest release to the document Title
  // only set this parameter when a release has been set
  nl_addReleaseTagTitle: true,

  // nl_organisationName is used for some company specific values in the header (and Sotd)
  // currently supported: Logius and Geonovum (default)
  nl_organisationName: "Logius",

  // prefix for the names of company specific css, svg and ico prefixes
  // defaults to "GN-"
  nl_organisationPrefix: "LS-",

  // class style can be automatically insertd in generated markdown tables
  // currently defaults to simple, but this may change
  //  nl_markdownTableClass: "ebms",

  // if nl_markdownEmbedImageInFigure is set to true images in markdown generated content will be surrounded with <figures> element
  // so that figures can be linked are be a part of table of figures
  nl_markdownEmbedImageInFigure: true,

  // this url points to the folder where organsation specific css files are stored
  // defaults to https://tools.geostandaarden.nl/respec/style/ if not set
  nl_organisationStylesURL: "https://publicatie.centrumvoorstandaarden.nl/respec/style/",

  // nl_organisationPublishURL points to organisation specifica publication page, used in header
  // defaults to  https://docs.geostandaarden.nl/"
  nl_organisationPublishURL: "https://publicatie.centrumvoorstandaarden.nl/",

  // nl_logo refers to company logo
  // defaults to https://tools.geostandaarden.nl/respec/style/logos/Geonovum.svg
  nl_logo: {
    src: "https://publicatie.centrumvoorstandaarden.nl/respec/style/logos/figure-logius.svg",
    alt: "Logius",
    id: "Logius",
    height: 77,
    width: 44,
    url: "https://www.logius.nl/standaarden",
  },
  localBiblio: {
    "OAuth2": {
      href: "https://tools.ietf.org/html/rfc6749",
      title:
        "The OAuth 2.0 Authorization Framework",
      authors: ["D. Hardt"],
      date: "October 2012",
      publisher: "The Internet Engineering Task Force",
    },
    "Expert": {
      href: "https://www.forumstandaardisatie.nl/sites/bfs/files/Expertadvies%20OAuth%202.0.pdf",
      title:
        "Expertadvies OAuth 2.0",
      authors: ["P. Dam"],
      date: "24 februari 2017",
      publisher: "Forum STandaardisatie",
    },
    "JWT": {
      href: "https://tools.ietf.org/html/rfc7519",
      title:
        "JSON Web Token (JWT)",
      authors: ["M. Jones, J. Bradley, N. Sakimura"],
      date: "may 2015",
      publisher: "IETF",
    },
    "JWS": {
      href: "https://tools.ietf.org/html/rfc7515",
      title:
        "JSON Web Signature (JWS)",
      authors: ["M. Jones, J. Bradley, N. Sakimura"],
      date: "may 2015",
      publisher: "IETF",
    },
    "JWE": {
      href: "https://tools.ietf.org/html/rfc7516",
      title:
        "JSON Web Encryption (JWE)",
      authors: ["M. Jones, J. Hildebrand"],
      date: "may 2015",
      publisher: "IETF",
    },
    "JWK": {
      href: "https://tools.ietf.org/html/rfc7517",
      title:
        "JSON Web Key (JWK))",
      authors: ["M. Jones"],
      date: "may 2015",
      publisher: "IETF",
    },
    "JWA": {
      href: "https://tools.ietf.org/html/rfc7518",
      title:
        "JSON Web Algorithms (JWA)",
      authors: ["M. Jones"],
      date: "may 2015",
      publisher: "IETF",
    },
    "PKCE": {
      href: "https://tools.ietf.org/html/rfc7636",
      title:
        "Proof Key for Code Exchange by OAuth Public Clients",
      authors: ["N. Sakimura, J. Bradley, N. Agarwal"],
      date: "september 2015",
      publisher: "IETF",
    },
    "Introspection": {
      href: "https://tools.ietf.org/html/rfc7662",
      title:
        "OAuth 2.0 Token Introspection",
      authors: ["J. Richer"],
      date: "October 2015",
      publisher: "IETF",
    },
    "OpenID.Core": {
      href: "https://openid.net/specs/openid-connect-core-1_0.html",
      title:
        "OpenID Connect Core 1.0",
      authors: ["N. Sakimura, J. Bradley, M. Jones, B. de Medeiros, C. Mortimore"],
      date: "November 8 2014",
      publisher: "OpenID foundation",
    },
    "iGOV.OpenID": {
      href: "https://openid.net/specs/openid-igov-openid-connect-1_0.html",
      title:
        "International Government Assurance Profile (iGov) for OpenID Connect 1.0 - draft 3",
      authors: ["M. Varley, P. Grassi"],
      date: "October 5 2018",
      publisher: "OpenID foundation",
    },
    "iGOV.OAuth2": {
      href: "https://openid.net/specs/openid-igov-oauth2-1_0.html",
      title:
        "International Government Assurance Profile (iGov) for OAuth 2.0",
      authors: ["J. Richer, M. Varley, P. Grassi"],
      date: "October 5 2018",
      publisher: "OpenID foundation",
    },
    "OpenID.Discovery": {
      href: "https://openid.net/specs/openid-connect-discovery-1_0.html",
      title:
        "OpenID Connect Discovery 1.0",
      authors: ["N. Sakimura, J. Bradley, M. Jones, E. Jay"],
      date: "November 8 2014",
      publisher: "OpenID foundation",
    },
    "I-D.ietf-oauth-pop-architecture": {
      href: "https://tools.ietf.org/html/draft-ietf-oauth-pop-architecture-08",
      title:
        "OAuth 2.0 Proof-of-Possession (PoP) Security Architecture",
      authors: ["P. Hunt, J. Richer, W. Mills, P. Mishra, H. Tschofenig"],
      date: "July 8, 2016",
      publisher: "IETF",
    },
    "HEART.OAuth2": {
      href: "https://openid.net/specs/openid-heart-oauth2-1_0.html",
      title:
        "Health Relationship Trust Profile for OAuth 2.0",
      authors: ["J. Richer"],
      date: "April 25, 2017",
      publisher: "OpenID foundation",
    },
    "JWS.JWE.Algs": {
      href: "https://www.iana.org/assignments/jose/jose.xhtml#web-signature-encryption-algorithms",
      title:
        "IANA JSON Web Signatures and Encryption Algorithms registry",
      authors: ["Jim Schaad, Jeff Hodges, Joe Hildebrand, Sean Turner"],
      date: "",
      publisher: "IANA",
    },
    "BCP195": {
      href: "https://tools.ietf.org/html/bcp195",
      title: "Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)",
      authors: ["Y. Sheffer, R. Holz, P. Saint-Andre"],
      date: "May 2015",
      publisher: "IETF",
    },
  },
};
