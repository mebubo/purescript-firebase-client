module Firebase
  ( FIREBASE
  , Options
  , initializeApp
  ) where

import Data.Unit

import Control.Monad.Eff (Eff, kind Effect)

foreign import data FIREBASE :: Effect

type Options = { apiKey :: String
               , authDomain :: String
               , databaseURL :: String
               , projectId :: String
               , storageBucket :: String
               , messagingSenderId :: String
               }

foreign import initializeApp :: forall eff. Options -> Eff (firebase :: FIREBASE | eff) Unit