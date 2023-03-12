import React from 'react'
import type { IconNames } from './sources'

const SPRITE_PATH = 'sprite.svg'

export const Icon = ({ name }: { name: IconNames }) => {
  return <svg><use x:href={`${SPRITE_PATH}#${name}`} /></svg>
}