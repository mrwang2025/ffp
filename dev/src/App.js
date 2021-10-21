import AppBar from "@material-ui/core/AppBar";
import Link from '@material-ui/core/Link';
import { createStyles, createTheme, makeStyles, MuiThemeProvider, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import React, { Suspense, useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-reflex/styles.css';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./common/errorBoundary";
import LoadingBar from "./common/loadingBar";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const EXAMPLE_TITLE_LIST = [
  'dashboard',
  'simple'
]

function getMuiTheme() {
  return createTheme({
    overrides: {
      MuiPaper: {
        rounded: {
          borderRadius: 5
        },
        elevation2: {
          boxShadow: ["none"]
        }
      },
      MuiButton: {
        root: {
          textTransform: 'none'
        }
      }
    }
  });
}

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      flexGrow: 1,
      marginLeft: 10,
      marginRight: 40
    },
    content: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: 0,
      height: '100%',
    },
  })
);

function BlankContent() {
  return <div>Welcome</div>
}

function TitleHeader(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <div className={classes.header}>
    <span style={{ paddingRight: 10, fontWeight: 'bold' }}>@mrwang2025/react-ui</span>
    {props.match.params.x || ''}
  </div>
}

function MenuItem({ title }) {
  return <Link href={title || '#'} target={'_self'} color="inherit" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    color: 'royalblue',
    padding: 5
  }}>
    <WidgetsRoundedIcon style={{ fontSize: 16, marginRight: 5 }} />
    {title}
  </Link>
}

function MenuList() {
  return <div style={{ width: '90%', height: '100%', paddingLeft: 10 }}>
    {
      EXAMPLE_TITLE_LIST.map(title => <MenuItem title={title} key={`example-${title}`} />)
    }
  </div>
}

function CodeView(props) {
  const [code, setCode] = useState('loading...');
  useEffect(() => {
    const exampleName = props.match.params.x || ''
    fetch(`${process.env.PUBLIC_URL}/code/${exampleName}.js`)
      .then((r) => r.text())
      .then(text => {
        console.log(text);
        setCode(text)
      }).catch(e => {
        console.error(e)
        setCode(`Can't find the example source code`)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.x])

  return <SyntaxHighlighter language="javascript" style={github}>
    {code}
  </SyntaxHighlighter>
}


function ExampleView(props) {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    const exampleName = props.match.params.x || ''
    if (EXAMPLE_TITLE_LIST.includes(exampleName.toLowerCase())) {
      try {
        const Viewer = React.lazy(() => import(`./examples/${exampleName}.js`));
        if (Viewer) {
          setViewer(<Viewer />)
        }
      } catch (error) {
        setViewer(<div>Error! Can not find example {exampleName}</div>)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.x])

  return <Suspense fallback={<LoadingBar estimateSeconds={3} />}>
    {viewer}
  </Suspense>
}

function App() {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <Router>
    <MuiThemeProvider theme={getMuiTheme()}>
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div>
          <AppBar position="relative">
            <Toolbar>
              {/* <img
              src={process.env.PUBLIC_URL + "/mrwang2025.logo"}
              className="header-logo"
              alt="mrwang2025 logo"
            /> */}
              <Switch>
                <Route path="/:x" component={TitleHeader} />
                <Route path="/" component={TitleHeader} />
              </Switch>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ flex: 2, overflow: 'auto' }}>
          <ReflexContainer orientation="vertical" style={{ with: '100%', height: '100%' }}>
            <ReflexElement minSize={200} size={300}>
              <div>
                <MenuList />
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement>
              <div style={{ height: '100%' }}>
                <PerfectScrollbar>
                  <main className={classes.content}>
                    <ReflexContainer>
                      <ReflexElement>
                        <ErrorBoundary>
                          <Switch>
                            <Route path="/:x" component={ExampleView} />
                            <Route path="/" component={BlankContent} />
                          </Switch>
                        </ErrorBoundary>
                      </ReflexElement>
                      <ReflexSplitter propagate={true} />
                      <ReflexElement>
                        <Switch>
                          <Route path="/:x" component={CodeView} />
                          <Route path="/" component={BlankContent} />
                        </Switch>
                      </ReflexElement>
                    </ReflexContainer>
                  </main>
                </PerfectScrollbar>
              </div>
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>
    </MuiThemeProvider>
  </Router>
}

export default App;
