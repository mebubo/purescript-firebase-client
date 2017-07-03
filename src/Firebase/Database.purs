module Firebase.Database
  ( onValue
  , write
  , push
  ) where

import Control.Monad.Eff (Eff)
import Firebase (FIREBASE)
import Prelude
import Data.Foreign (Foreign)

foreign import onValue
  :: ∀ eff
   . String
  -> (Foreign -> Eff (firebase :: FIREBASE | eff) Unit)
  -> Eff (firebase :: FIREBASE | eff) (Eff (firebase :: FIREBASE | eff) Unit)

foreign import write
  :: ∀ eff
   . String
  -> Foreign
  -> Eff (firebase :: FIREBASE | eff) Unit

foreign import push
  :: forall eff
   . String
  -> Foreign
  -> Eff (firebase :: FIREBASE | eff) Unit
