module Main where

import Prelude (Unit, bind, const, discard, pure, show, unit, ($), (<>), (>>>))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Aff (runAff)
import Firebase (FIREBASE)
import Firebase.Authentication as FBA
import Firebase.Database as FBD
import Data.Argonaut (encodeJson)

main :: forall e. Eff (firebase :: FIREBASE, console :: CONSOLE | e) Unit
main = do
  provider <- FBA.newGoogleProvider
  _ <- runAff (show >>> log) (const $ pure unit) do
    FBA.signInWithPopup provider
    liftEff do
      _ <- FBD.onValue "/__test" $ \json -> do
        log $ "onValue: " <> show json
      log "Now writing..."
      FBD.write "/__test" $ encodeJson "99 bottles of beer on the wall, ..."
      log "Writing done."
  pure unit
